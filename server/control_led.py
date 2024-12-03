import RPi.GPIO as GPIO
import sys

# กำหนด GPIO PIN
PIN_LIGHT = 18

# ตั้งค่า GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(PIN_LIGHT, GPIO.OUT)

# รับคำสั่งจาก command line arguments
command = sys.argv[1] if len(sys.argv) > 1 else "off"

try:
    if command == "on":
        GPIO.output(PIN_LIGHT, GPIO.HIGH)
        print("LED ON")
    elif command == "off":
        GPIO.output(PIN_LIGHT, GPIO.LOW)
        print("LED OFF")
    else:
        print("Invalid command")
except Exception as e:
    print(f"Error: {e}")
