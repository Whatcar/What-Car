import tensorflow_hub as hub
from tensorflow import keras

from ai.resnet152_model.resnet_152 import resnet152_model


def load_model(path):
    # model = keras.models.load_model(path)
    img_width, img_height = 224, 224
    num_channels = 3
    num_classes = 208
    model = resnet152_model(img_height, img_width, num_channels, num_classes)
    model.load_weights(path, by_name=True)
    return model


def load_model_detection(path):
    model = hub.load(path)
    return model
