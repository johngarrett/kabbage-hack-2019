import cv2
from imutils import paths
import numpy as np 
import sys
import imutils
from imutils.object_detection import non_max_suppression

#setup HOG detector 
hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

cv2.startWindowThread()
capture = cv2.VideoCapture("videos/lunch-wide-cut.mov")

kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(3,3))
fgbg = cv2.bgsegm.createBackgroundSubtractorMOG()
while True:
    ok, frame = capture.read()
    if not ok:
        print("Cannot read video")
        sys.exit()

    # improve detection accuracy and speed
    #frame = cv2.resize(frame, (640, 480))

#   frame = fgbg.apply(frame)
#    frame = cv2.morphologyEx(frame, cv2.MORPH_OPEN, kernel)

    # apply bilateral filter
    frame = cv2.bilateralFilter(frame, 9, 75, 75)
    #apply threshold
    ret, frame = cv2.threshold(frame, 80, 255, cv2.THRESH_BINARY)
    
    boxes, weights = hog.detectMultiScale(frame, winStride=(4, 4), padding=(8, 8), scale=1.05)

    rects = np.array([[x, y, x + w, y + h] for (x, y, w, h) in boxes])
    pick = non_max_suppression(rects, probs=None, overlapThresh=0.65)

    # draw the final bounding boxes
    for (xA, yA, xB, yB) in pick:
        cv2.rectangle(frame, (xA, yA), (xB, yB), (200, 255, 0), 2)
        print(frame)

    cv2.imshow('frame', frame)
    cv2.waitKey(1)

