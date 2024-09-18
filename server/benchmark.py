# benchmark performance between the mistral model and random forest model
import time
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import mean_squared_error, r2_score
from intel_dev_cloud.inference import load_mistral_model, mistral_predict
from server.prediction.random_forest_model import load_rf_model, rf_predict

def load_test_data():
    