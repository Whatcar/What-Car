import os
import random

import cv2
import keras.backend as K
import numpy as np
import tensorflow as tf

from ai.detection import detection
from ai.utils import load_model


class Resnet:
    def __init__(self, path):
        print("resnet model load...")
        self.resnet_model = load_model(path)
        print("resnet model end!")

    def _calculate_box(self, img_shape, box_points):
        y_min, x_min, y_max, x_max = box_points
        try:
            # image crop position
            s1, s2, t1, t2 = (
                int(y_min * img_shape[0]),
                int(x_min * img_shape[1]),
                int(y_max * img_shape[0]),
                int(x_max * img_shape[1]),
            )
        except Exception as e:
            # no car
            print(e)
            return None
        return s1, s2, t1, t2

    def _crop_car_box(self, img, box_points):
        s1, s2, t1, t2 = self._calculate_box(img.shape, box_points)
        # image crop
        cropped_img = tf.image.crop_to_bounding_box(img, s1, s2, t1 - s1, t2 - s2)

        cropped_img = tf.reshape(
            cropped_img, [cropped_img.shape[0], cropped_img.shape[1], 3]
        ).numpy()

        # resnet-152 input_size = (224, 224, 3)
        cropped_img = cv2.resize(src=cropped_img, dsize=(224, 224))
        cropped_img = cv2.cvtColor(cropped_img, cv2.COLOR_BGR2RGB)

        return cropped_img

    def predict(self, img, box_points):
        cropped_img = self._crop_car_box(img, box_points)

        # cropped_img = np.divide(cropped_img, 255.0, casting="unsafe")
        cropped_img = np.expand_dims(cropped_img, 0)
        preds = self.resnet_model.predict(cropped_img)
        # 차원 축소
        preds = np.squeeze(preds)
        # 튜플형태를 int형으로
        preds = [(idx[0], val) for idx, val in np.ndenumerate(preds)]
        preds = sorted(preds, key=lambda x: x[1], reverse=True)[:5]

        K.clear_session()
        return preds

    def visualize(self, img, box_points):
        x1, y1, x2, y2 = self._calculate_box(img.shape, box_points)
        r, g, b = [random.randrange(0, 256) for _ in range(3)]
        bounding_box_img = cv2.rectangle(img, (y1, x1), (y2, x2), (r, g, b), 3)

        return bounding_box_img


pathes = [os.getcwd(), "ai", "resnet152_model", "model2021-2.65-0.90.hdf5"]
model_path = os.path.join(*pathes)
model = Resnet(path=model_path)
