dags=$(airflow dags list | awk '{if(NR>2)print $1}')

for dag_id in $dags; do
    if [ "$dag_id" != "run_boxrec_data" ]; then
        airflow dags show "$dag_id" &>/dev/null
        if [ $? -eq 0 ]; then
            airflow dags delete "$dag_id"
        else
            echo "DAG '$dag_id' not found. Skipping deletion."
        fi
    fi
done
