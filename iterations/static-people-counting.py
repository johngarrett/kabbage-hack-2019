import cv2
from imutils import paths
import numpy as np 
import imutils
from imutils.object_detection import non_max_suppression

#setup HOG detector 
hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())
cv2.startWindowThread()

def detector(image):
    #  image = imutils.resize(image, width=min(400, image.shape[1]))
    #image = imutils.resize(image, width=min(400, image.shape[1]))
    
    # smoothing without removing edges
    # image = cv2.bilateralFilter(image, 7, 50, 50)

    rects, weight = hog.detectMultiScale(image,  winStride=(8,8), padding=(32, 32), scale=1.05)

    rects = np.array([[x, y, x + w, y + h] for (x, y, w, h) in rects])
    result = non_max_suppression(rects, probs=None, overlapThresh=0.65)

    return result, image 

def imageDetect():
        frame = cv2.imread('hallway2.jpeg', 1)
        result, frame = detector(frame)

        for (xA, yA, xB, yB) in result:
            cv2.rectangle(frame, (xA, yA), (xB, yB), (0, 255, 0), 2)
        cv2.imshow('frame', frame)
        cv2.waitKey(0)        
if __name__ == '__main__':
    imageDetect()
