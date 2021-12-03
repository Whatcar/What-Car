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

    def crop_car_image(self, filename, save=False):
        img = cv.imread(filename)

        img = tf.convert_to_tensor(cv.resize(src=img, dsize=(512, 512)), dtype=tf.uint8)
        img = tf.reshape(img, [1, 512, 512, 3])

        results = self.model(img)
        result = {key: value.numpy() for key, value in results.items()}

        # y_min, x_min, y_max, x_max = result['detection_boxes'][0][0]
        # 상위 5개중에서 차, 트럭을 찾으면 나온다.
        for idx in range(5):
            if (
                result["detection_classes"][0][idx] == 3.0
                or result["detection_classes"][0][idx] == 8.0
                or result["detection_classes"][0][idx] == 6.0
            ):
                y_min, x_min, y_max, x_max = result["detection_boxes"][0][idx]
                break

        try:
            # image crop position
            s1, s2, t1, t2 = (
                int(y_min * img.shape[2]),
                int(x_min * img.shape[1]),
                int(y_max * img.shape[2]),
                int(x_max * img.shape[1]),
            )
        except Exception as e:
            # no car
            print(e)
            return
        # image crop
        cropped_img = tf.image.crop_to_bounding_box(img, s1, s2, t1 - s1, t2 - s2)
        cropped_img = tf.reshape(
            cropped_img, [cropped_img.shape[1], cropped_img.shape[2], 3]
        ).numpy()

        # resnet-152 input_size = (224, 224, 3)
        cropped_img = cv.resize(src=cropped_img, dsize=(224, 224))
        cropped_img = cv.cvtColor(cropped_img, cv.COLOR_BGR2RGB)

        # show cropped image
        if save:
            plt.imshow(cropped_img)
            name = filename.split("/")[-1]
            folder_name = "result"
            if not os.path.exists(folder_name):
                os.makedirs(folder_name)

            plt.savefig(f"result/{name}")

        return cropped_img


detection = Detection("https://tfhub.dev/tensorflow/centernet/hourglass_512x512/1")
