import os

import cv2 as cv
import matplotlib.pyplot as plt
import tensorflow as tf

from ai.utils import load_model_detection


class Detection:
    def __init__(self, path):
        print("detection model load...")
        self.model = load_model_detection(path)
        print("detection model end!")

    def _capture_car(self, result):
        """차가 있는지 판단

        Args:
            result (dict): detection한 후 나온 결과값

        Returns:
            [y_min, x_min, y_max, x_max]: 차의 box point
        """

        def check_size(detection_box):
            y_min, x_min, y_max, x_max = detection_box
            # 너무 작은 차들은 뺀다. 중점적으로 찍은 차만 고른다.
            if y_max - y_min > 0.3 and x_max - x_min > 0.3:
                return True
            return False

        cars = result["detection_classes"][0][:5]
        for idx in range(len(cars)):
            if cars[idx] in [3.0, 8.0, 6.0] and check_size(
                result["detection_boxes"][0][idx]
            ):
                y_min, x_min, y_max, x_max = result["detection_boxes"][0][idx]
                break
        return (y_min, x_min, y_max, x_max)

    def predict(self, img):

        img = tf.convert_to_tensor(cv.resize(src=img, dsize=(512, 512)), dtype=tf.uint8)
        img = tf.reshape(img, [1, 512, 512, 3])

        results = self.model(img)
        result = {key: value.numpy() for key, value in results.items()}

        box_points = self._capture_car(result)
        if box_points is None:
            return None
        return box_points


detection = Detection("https://tfhub.dev/tensorflow/centernet/hourglass_512x512/1")
