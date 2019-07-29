from imutils.video import VideoStream
import cv2
import imutils
import numpy as np

min_area = 2000
max_area = 5000

vs = cv2.VideoCapture('videos/lunch-wide-cut.mov')
refrence_frame = None

frame_count = 0
persons_count = 0
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
    persons_count += len(rects)

    if frame_count % 24 == 0:
        print(f'Average persons: {persons_count // 48}')
        persons_count = 0
