import os
import json
from src.utils.gcs_stroage_utils import read_file


# deployment.json needs to be in root

with open('./deployment.json') as fp:
    config = json.load(fp)

json_str = read_file(config.get("APP_DATA_BUCKER", "doc_bot_data"), "app_constants.json")
app_config = json.loads(json_str)


class Constants:
    DOCUMENT_KEY= "document_template"
    print("Loading : DOCUMENT_KEY", DOCUMENT_KEY)
    INSTALL_ROOT = 'C:\\Users\\samyu\\Desktop\\invoice\\gcp_doc\\doc_extraction'
    IMAGE_SOURCE_DIR = config.get("IMAGE_SOURCE_DIR", "documents_runtime")
    SAMPLE_DOCS = config.get("SAMPLE_DOCS", "documents_samples")
    IMAGE_DESTINATION_DIR = config.get("IMAGE_DESTINATION_DIR", "invoice_documents_processed")
    TEMPLATE_FOLDER = config.get("TEMPLATE_FOLDER", "documents_metadata")
    IMAGE_FILE_PATH = INSTALL_ROOT + "\\images\\"  # add path to images
    BOUNDED_IMAGES_PATH = INSTALL_ROOT + "\\images\\"
    CREDENTIALS_PATH = INSTALL_ROOT + "\\creds.json"
    PROJECT_ID = config.get("PROJECT_ID", "springml-docai")
    STORAGE_OPTION = config.get("STORAGE_OPTION")
    INPUT_FILE = ''
    PYTHON_FILES_NATIVE = []
    PYTHON_FILES_CUSTOM = []
    NORTHWELL_ENDPOINT =  app_config.get("NORTHWELL_ENDPOINT")
    PDF_TO_IMAGE_ENDPOINT = app_config.get("PDF_TO_IMAGE_ENDPOINT")
    ALPHAVISION_ENDPOINT = app_config.get("ALPHAVISION_ENDPOINT")
    USE_ALPHAVISION_ANNOTATION_FLAG = app_config.get("USE_ALPHAVISION_ANNOTATION_FLAG", False)
    ALPHAVISION_ANNOTATION_ENDPOINT = app_config.get("ALPHAVISION_ANNOTATION_ENDPOINT")
    TEMPLATE_PROCESSOR_MAP = app_config.get("TEMPLATE_PROCESSOR_MAP") 
    # METLIFE_FLAG = 'y'
    DEFAULT_PROCESSOR =  app_config.get("DEFAULT_PROCESSOR", "DocumentProcessor")
    # GENERATOR_FLAG = app_config.get("GENERATOR_FLAG", False)
    GENERATOR_FLAG = True
    USE_ALPHAVISION_FUNCTION_FLAG = app_config.get("USE_ALPHAVISION_FUNCTION_FLAG", True),
    DISTANCE_BUFFER = app_config.get("DISTANCE_BUFFER")
    VERTICES = ['vertices1', 'vertices2', 'vertices3', 'vertices4']
    WORDLIST_COLUMNS = ['words', 'vertices1', 'vertices2', 'vertices3', 'vertices4']
    BLOCK_COLUMNS = ['block', 'label', 'vertices1', 'vertices2', 'vertices3', 'vertices4', 'text']
    IMAGE_BREAK_TYPES = [1,2,3,5]
    VERTEX_1 = 'vertices1'
    VERTEX_2 = 'vertices2'
    VERTEX_3 = 'vertices3'
    VERTEX_4 = 'vertices4'
    ENV_TEMPLATE_FOLDER = 'templates'
    ENV_TEMPLATE_IMAGE_FOLDER = 'template_images'
    RUN_TIME_DOC_FOLDER = 'run_time_docs'
    TEST_PLAN_FOLDER = 'testCasesOutputFiles/'
    APP_DATA_BUCKER = config.get("APP_DATA_BUCKER", "doc_bot_data")
    IMAGE_OFFSET = 2
    TENANT_ID = app_config.get("TENANT_ID", "springml")
    FIREBASE_SECRET_ID = config.get("FIREBASE_SECRET_ID")
    FIREBASE_API_KEY = config.get("FIREBASE_API_KEY")
