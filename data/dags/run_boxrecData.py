from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from datetime import datetime, timedelta
import logging
import os
import subprocess

def run_nodejs_script():
    # Extracting the path from AIRFLOW_CONFIG environment variable
    script_path = os.getenv('AIRFLOW_CONFIG')

    # Ensure the path is correctly pointed to the JS file
    if script_path:
        process = subprocess.Popen(['node', script_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()
        if process.returncode == 0:
            logging.info(stdout.decode())
            logging.info("boxRecData.js executed successfully")
        else:
            logging.error(stderr.decode())
    else:
        logging.error("Script path not found in AIRFLOW_CONFIG environment variable")


default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 2, 14),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'run_boxrec_data',
    default_args=default_args,
    description='A simple DAG to run boxRecData.js',
    schedule_interval=timedelta(days=1),
)

run_js = BashOperator(
    task_id='run_boxrec_data_file',
    bash_command='node /Users/ripplingadmin/Desktop/PersonalWork/BoxingData/data/dags/boxrecData.js && echo "boxRecData.js executed successfully"',
    dag=dag,
)

run_js