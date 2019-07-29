import cv2
import sys 
import imutils
import datetime
import threading
import numpy as np
from flask import Flask
from flask_restful import Resource, Api
from imutils.video import VideoStream

app = Flask(__name__)
api = Api(app)

persons_count = 0
vs = cv2.VideoCapture('https://stream-us1-foxtrot.dropcam.com/nexus_aac/f2a6b836da604bae9ca428635c173814/chunklist_w1121249579.m3u8?public=6F7uwYxcUX')
class PersonDetection(Resource):
    global persons_count
    def count_people():
        refrence_frame = None
        frame_count = 0
        total_persons_count = 0
        print(vs.isOpened)
        while True:
            print('entering the loop', file=sys.stderr)
            frame_count += 1
            _, current_frame = vs.read()
            print(vs, file=sys.stderr)
            if current_frame is None:
                print('no current frame!', file=sys.stderr)
                break
            
            # convert to grayscale, and blur it
            edited_frame = cv2.cvtColor(current_frame, cv2.COLOR_BGR2GRAY)
            edited_frame = cv2.bilateralFilter(edited_frame, 7, 50, 50)
            
            if refrence_frame is None:
                refrence_frame = edited_frame

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
                if cv2.contourArea(contour) < 2000:
                    continue

                if cv2.contourArea(contour) > 5000:
                    continue

                rects.append(cv2.boundingRect(contour))
            cv2.groupRectangles(rects, 1, 5)
            total_persons_count += len(rects)
            persons_count = round(total_persons_count / frame_count)
            print(persons_count, file=sys.stderr)

class LineStatistics(Resource):
    global persons_count
    def line_open():
        current_time = datetime.datetime.now()
        if current_time.hour == 11 and current_time.minute > 38:
            return true
        elif current_time.hour == 2 and current_time.minute > 2:
            return true
        else:
            return false
    def get(self):
        return persons_count


api.add_resource(LineStatistics, '/')
if __name__ == '__main__':
    thread = threading.Thread(target=PersonDetection.count_people).start()
    app.run(host='0.0.0.0', port=80, debug=True)
