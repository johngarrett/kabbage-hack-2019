import cv2
from imutils import paths
import numpy as np 
import imutils
from imutils.object_detection import non_max_suppression

#setup HOG detector 
hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

# background removal
fgbg = cv2.bgsegm.createBackgroundSubtractorMOG()

cv2.startWindowThread()
# cap = cv2.VideoCapture("https://stream-uc2-delta.dropcam.com/nexus_aac/ccb95a5e149846948179d0428ecc9304/chunklist_w803407664.m3u8?public=ScE29hOA5L")
cap = cv2.VideoCapture("videos/hallway_cut.mov")

def detector(image):
    image = imutils.resize(image, width=min(400, image.shape[1]))
    
    # smoothing without removing edges
    image = cv2.bilateralFilter(image, 7, 50, 50)
    image = fgbg.apply(image)


    rects, weight = hog.detectMultiScale(image,  winStride=(8,8), padding=(32, 32), scale=1.05)

    rects = np.array([[x, y, x + w, y + h] for (x, y, w, h) in rects])
    result = non_max_suppression(rects, probs=None, overlapThresh=0.65)

    return result, image 

def cameraDetect():
    while True:
        ret, frame = cap.read()
        frame = imutils.resize(frame, width=min(400, frame.shape[1]))
        result, frame = detector(frame.copy())

        for (xA, yA, xB, yB) in result:
            cv2.rectangle(frame, (xA, yA), (xB, yB), (0, 255, 0), 2)
        cv2.imshow('frame', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    cameraDetect()
