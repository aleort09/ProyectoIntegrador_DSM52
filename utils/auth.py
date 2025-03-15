from datetime import datetime, timedelta

failed_attempts = {}

def check_failed_attempts(correo):
    if correo in failed_attempts and failed_attempts[correo]["locked"]:
        if datetime.now() < failed_attempts[correo]["unlockTime"]:
            tiempo_restante = (failed_attempts[correo]["unlockTime"] - datetime.now()).seconds // 60
            return {"blocked": True, "tiempo_restante": tiempo_restante}
        else:
            failed_attempts.pop(correo, None)
    return {"blocked": False}

def increment_failed_attempts(correo):
    if correo not in failed_attempts:
        failed_attempts[correo] = {"count": 1, "locked": False, "unlockTime": None}
    else:
        failed_attempts[correo]["count"] += 1

    if failed_attempts[correo]["count"] >= 3:
        failed_attempts[correo]["locked"] = True
        failed_attempts[correo]["unlockTime"] = datetime.now() + timedelta(minutes=5)