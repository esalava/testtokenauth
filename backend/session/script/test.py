import pyotp

totp = pyotp.TOTP('QMV65S2X4M355P3WLVMZG5MNWYUCAUF2')
print(totp.now())
print(totp.now())
print(totp.now())
totp3 = pyotp.TOTP('QMV65S2X4M355P3WLVMZG5MNWYUCAUF2')
print(totp3.now())

totp2 = pyotp.TOTP('QMV65S2X4M355P3WLVMZG5MNWYUCAUF3')
print(totp2.now())
print(totp2.now())
print(totp2.now())
