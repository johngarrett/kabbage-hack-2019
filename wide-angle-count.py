from imutils.video import VideoStream
import cv2
import imutils
import numpy as np

min_area = 2000
max_area = 5000

vs = cv2.VideoCapture('videos/lunch-wide-cut.mov')

refrence_frame = None

frame_count = 0
while True:
    frame_count += 1
    _, current_frame = vs.read()

    if current_frame is None:
        break
    
    # convert to grayscale, and blur it
    edited_frame = cv2.cvtColor(current_frame, cv2.COLOR_BGR2GRAY)
    edited_frame = cv2.bilateralFilter(edited_frame, 7, 50, 50)

    # every 10 seconds, compare the delta
    if refrence_frame is None or frame_count % 48 == 0:
        refrence_frame = edited_frame
        continue

    # compute the absolute difference between the current frame and
    # first frame
    frame_delta = cv2.absdiff(refrence_frame, edited_frame)
    thresh = cv2.threshold(frame_delta, 50, 255, cv2.THRESH_BINARY)[1]

    # dilate the thresholded image to fill in holes, then find contours
    # on thresholded image
    thresh = cv2.dilate(thresh, np.ones((5,5), np.uint8), iterations = 1)
    countours = cv2.findContours(thresh.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)
    countours = imutils.grab_contours(countours)

    rects = [] # the detected movement

    for contour in countours:
        if cv2.contourArea(contour) < min_area:
            continue

        if cv2.contourArea(contour) > max_area:
            continue

        rects.append(cv2.boundingRect(contour))
    cv2.groupRectangles(rects, 1, 5)

    print(rects)
    for (x, y, w, h) in rects:
        cv2.rectangle(current_frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
    
    if frame_count % 48 != 0:
        # draw the text and timestamp on the frame
        cv2.putText(current_frame, f'People Count: {len(rects)}', (90, 90),
                    cv2.FONT_HERSHEY_SIMPLEX, 3, (0, 0, 255), 5)

    cv2.imshow("Camera Feed", current_frame)
    cv2.imshow("Thresh", thresh)
    cv2.imshow("Frame Delta", frame_delta)
    cv2.waitKey(1)
