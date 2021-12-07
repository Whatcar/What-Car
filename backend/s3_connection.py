import boto3

from config import aws_s3


def s3_connection():
    try:
        s3 = boto3.client(
            "s3",
            aws_access_key_id=aws_s3["AWS_ACCESS_KEY"],
            aws_secret_access_key=aws_s3["AWS_SECRET_KEY"],
        )
    except Exception as e:
        print(e)
        exit(ERROR_S3_CONNECTION_FAILED)
    else:
        print("s3 bucket connected!")
        return s3


def s3_resource():
    try:
        s3 = boto3.resource(
            "s3",
            aws_access_key_id=aws_s3["AWS_ACCESS_KEY"],
            aws_secret_access_key=aws_s3["AWS_SECRET_KEY"],
        )
    except Exception as e:
        print(e)
        exit(ERROR_S3_CONNECTION_FAILED)
    else:
        print("s3 bucket connected!")
        return s3
