from imutils.video import VideoStream
import argparse
import datetime
import cv2
import imutils

args = {}
args['video'] = 'videos/hallway_cut.mov'
args['min_area'] = 1000
args['max_area'] = 5000

vs = cv2.VideoCapture(args["video"])

# initialize the first frame in the video stream
firstFrame = None

# loop over the frames of the video
while True:
    # grab the current frame and initialize the occupied/unoccupied
    frame = vs.read()
    frame = frame if args.get("video", None) is None else frame[1]

    if frame is None:
        break
    
    # convert to grayscale, and blur it
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    #gray = cv2.bilateralFilter(gray, 7, 50, 50)

    # if the first frame is None, initialize it
    if firstFrame is None:
        firstFrame = gray
        continue

    # compute the absolute difference between the current frame and
    # first frame
    frameDelta = cv2.absdiff(firstFrame, gray)
    thresh = cv2.threshold(frameDelta, 25, 255, cv2.THRESH_BINARY)[1]

    # dilate the thresholded image to fill in holes, then find contours
    # on thresholded image
    thresh = cv2.dilate(thresh, None, iterations=2)
    cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)

    rects = [] # the detected people

    for c in cnts:
        # if the contour is too small, ignore it
        if cv2.contourArea(c) < args['min_area']:
            continue

        if cv2.contourArea(c) > args['max_area']:
            continue

        rects.append(cv2.boundingRect(c))
    cv2.groupRectangles(rects, 1, 1.5)

    print(rects)
    for (x, y, w, h) in rects:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # draw the text and timestamp on the frame
    cv2.putText(frame, f'People Count: {len(rects)}', (10, 20),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

    # show the frame and record if the user presses a key
    cv2.imshow("Nest Feed", frame)
    #cv2.imshow("Thresh", thresh)
    #cv2.imshow("Frame Delta", frameDelta)
    cv2.waitKey(1)

# cleanup the camera and close any open windows
vs.stop() if args.get("video", None) is None else vs.release()
cv2.destroyAllWindows()
