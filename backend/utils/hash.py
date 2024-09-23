import hashlib


def hash_sha256(d):
    return hashlib.sha256(d.encode('utf-8')).hexdigest()
