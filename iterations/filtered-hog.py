from imutils.video import VideoStream
import cv2
import imutils
import numpy as np
from imutils.object_detection import non_max_suppression

min_area = 2000
max_area = 5000

vs = cv2.VideoCapture('videos/lunch-wide-cut.mov')
refrence_frame = None
frame_count = 0

hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

while True:
    frame_count += 1
    _, current_frame = vs.read()

    if current_frame is None:
        break
    
    # convert to grayscale, and blur it
    edited_frame = cv2.cvtColor(current_frame, cv2.COLOR_BGR2GRAY)

    # every 10 seconds, compare the delta
    if refrence_frame is None:# or frame_count % 6 == 0:
        refrence_frame = edited_frame
        continue

    # compute the absolute difference between the current frame and
    # first frame
    frame_delta = cv2.absdiff(refrence_frame, edited_frame)
    boxes, weights = hog.detectMultiScale(frame_delta, winStride=(4, 4), padding=(8, 8), scale=1.05)
    rects = np.array([[x, y, x + w, y + h] for (x, y, w, h) in boxes])
    pick = non_max_suppression(rects, probs=None, overlapThresh=0.65) 
    
    for (xA, yA, xB, yB) in rects:
        cv2.rectangle(current_frame, (xA, yA), (xB, yB), (200, 255, 0), 2)
 #   if frame_count % 5 != 0:
        # draw the text and timestamp on the frame
    cv2.putText(current_frame, f'People Count: {len(rects)}', (90, 90),
                cv2.FONT_HERSHEY_SIMPLEX, 3, (0, 0, 255), 5)

    cv2.imshow("Camera Feed", current_frame)
    cv2.imshow("Frame Delta", frame_delta)
    cv2.waitKey(1)
