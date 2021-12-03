import os

import keras.backend as K
import numpy as np

from ai.detection import detection
from ai.utils import load_model


class Resnet:
    def __init__(self, path, detection):
        print("resnet model load...")
        self.resnet_model = load_model(path)
        self.detect_model = detection
        print("resnet model end!")

    def predict(self, img):

        cropped_img = self.detect_model.crop_car_image(img, save=True)
        cropped_img = np.divide(cropped_img, 255.0, casting="unsafe")
        cropped_img = np.expand_dims(cropped_img, 0)
        preds = self.resnet_model.predict(cropped_img)

        prob = np.max(preds)
        class_id = np.argmax(preds)
        K.clear_session()
        return class_id, prob

    def visualize(self, img):
        pass


pathes = [os.getcwd(), "ai", "resnet152_model", "model.32-0.92.hdf5"]
model_path = os.path.join(*pathes)
model = Resnet(path=model_path, detection=detection)
