from flask import Flask, request, jsonify, make_response
from flask_restx import Api, Resource, fields
#from sklearn.externals import joblib
from PIL import Image
import keras
from tensorflow.keras.applications.resnet50 import ResNet50
from keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
import tensorflow as tf
import numpy as np
import os
import logging
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from  tensorflow import keras

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


flask_app = Flask(__name__)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "ML React App", 
		  description = "Predict results using a trained model")

name_space = app.namespace('prediction', description='Prediction APIs')

UPLOAD_FOLDER = 'D:/Image-Classification-React-App/upload_images/'
flask_app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# model = app.model('Prediction params', 
# 				  {'file': fields.String(required = True, 
# 				  							   description="Image to predict", 
#     					  				 	   help="Image cannot be blank")})

# classifier = joblib.load('classifier.joblib')

graph = tf.compat.v1.get_default_graph()
clf = ResNet50(weights='imagenet')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	#@app.expect(model)		
	def post(self):
		#try: 				
		#formData = request.files['file'] 
		#data = request.json
		target=os.path.join(UPLOAD_FOLDER,'test_docs')
		if not os.path.isdir(target):
			os.mkdir(target)
		logger.info("welcome to upload`")
		file = request.files['file'] 
		filename = secure_filename(file.filename)
		print(file.filename)
		destination="/".join([target, filename])
		file.save(destination)


		Li = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 
		'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 
      	'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 
      	'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy', 
      	'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 
      	'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch',
      	'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 
      	'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
      	'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy']
		
		model_1 = load_model('D:/Image-Classification-React-App/final_model.h5')
		new_img =keras.utils.load_img(destination, target_size=(224, 224))
		img = keras.utils.img_to_array(new_img)
		img = np.expand_dims(img, axis=0)
		img = img/255
		prediction = model_1.predict(img)
		print(destination)
		probabilty = prediction.flatten()
		max_prob = probabilty.max()
		index=prediction.argmax(axis=-1)[0]
		class_name = Li[index]
		# img = image.load_img(destination, target_size=(224, 224))
		# x = image.img_to_array(img)
		# x = np.expand_dims(x, axis=0)
		# x = preprocess_input(x)

		print('predicting...')
		print('Predicted:', )

		response = jsonify({
			"statusCode": 200,
			"status": "Prediction made",
			"result": "Prediction: " + class_name  # str(data)
			})
		response.headers.add('Access-Control-Allow-Origin', '*')
		return response