from imutils.video import VideoStream
import cv2
import imutils

min_area = 1500
max_area = 8000

vs = cv2.VideoCapture('videos/lunch1-cut.mov')

refrence_frame = None

count = 0
while True:
    count += 1
    _, original_frame = vs.read()

    if original_frame is None:
        break
    
    # convert to grayscale, and blur it
    edited_frame = cv2.cvtColor(original_frame, cv2.COLOR_BGR2GRAY)
    edited_frame = cv2.bilateralFilter(edited_frame, 7, 50, 50)

    # every second, compare the delta
    if refrence_frame is None or count % 24 == 0:
        refrence_frame = edited_frame
        continue

    # compute the absolute difference between the current frame and
    # first frame
    frame_delta = cv2.absdiff(refrence_frame, edited_frame)
    thresh = cv2.threshold(frame_delta, 50, 255, cv2.THRESH_BINARY)[1]

    # dilate the thresholded image to fill in holes, then find contours
    # on thresholded image
    thresh = cv2.dilate(thresh, None, iterations = 2)
    countours = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    countours = imutils.grab_contours(countours)

    rects = [] # the detected movement

    for contour in countours:
        if cv2.contourArea(contour) < min_area:
            continue

        if cv2.contourArea(contour) > max_area:
            continue

        rects.append(cv2.boundingRect(contour))
    cv2.groupRectangles(rects, 10, 10)

    print(rects)
    for (x, y, w, h) in rects:
        cv2.rectangle(original_frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # draw the text and timestamp on the frame
    cv2.putText(original_frame, f'People Count: {len(rects)}', (10, 20),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

    cv2.imshow("Camera Feed", original_frame)
    #cv2.imshow("Thresh", thresh)
    #cv2.imshow("Frame Delta", frame_delta)
    cv2.waitKey(1)
