import cv2
import sys 
import imutils
from datetime import datetime, time
import threading
import numpy as np
import requests
from flask import Flask, json, request
from flask_restful import Resource, Api
from imutils.video import VideoStream

app = Flask(__name__)
api = Api(app)

class PersonDetection(Resource):
    def get_url():
        f = open("videoURL", "r")
        url = f.read()
        print(f'[OpenCV] read the following url: {url}', file=sys.stderr)
        f.close()
        return url

    def count_people():
        vs = cv2.VideoCapture(PersonDetection.get_url())
        refrence_frame = None
        frame_count = 0
        total_persons_count = 0
        print(f'[OpenCV] video stream is opened: {vs.isOpened()}')
        while True:
            frame_count += 1
            _, current_frame = vs.read()
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
            f = open("personsCount", "w")
            f.write(str(round(total_persons_count / frame_count)))
            f.close()

class LineStatistics(Resource):
    def line_open():
        if datetime.now().time() >= time(11,30) and datetime.now().time() <= time (14,2):
            return True
        else: 
            return False

    @app.route('/line/stats')
    def get_stats():
        f = open("personsCount", "r")
        count = int(f.read())
        f.close()

        if count < 10:
            lineStatus = "Normal"
        elif count > 10 and count < 15:
            lineStatus = "Slightly Busy"
        elif count > 15 and count < 20:
            lineStatus = "Busy"
        else:
            lineStatus = "Very Busy"

        data = {'lineOpen': LineStatistics.line_open(), 'lineLength':count, 'linePace': count // 3}

        resp = app.response_class(response=json.dumps(data), status=200,mimetype='plain/text') #should have left a PR comment
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

    @app.route('/line/update-url')
    def update_url():
        url = request.args.get('url')
        print(f'[Flask] we were given a new video url: {url}', file=sys.stderr)
        f = open("videoURL", "w") # save the newest url to file. if the server crashes, it wont be null
        f.write(url)
        f.close()
        return url

    @app.route('/line/video-url')
    def return_url():
        f = open("videoURL", "r")
        url = f.read()
        f.close()
        return {'url': url }

    @app.route('/lunches/<string:date>')
    def get_lunches(date):
        r = requests.get(f'http://lunch.kabbage.com/api/v2/lunches/{date}')
        response = app.response_class(response=r.text, status=r.status_code,content_type=r.headers['content-type'])
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
        
if __name__ == '__main__':
    threading.Thread(target=PersonDetection.count_people).start()
    threading.Thread(target=app.run(host='0.0.0.0', port=80)).start()
