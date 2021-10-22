def json_to_array_factor(json_data: dict):
    co2: dict = json_data.get("co2")
    humidity: dict = json_data.get("humidity")
    temperature: dict = json_data.get("temperature")
    vibration: dict = json_data.get("vibration")
    if not co2 or not humidity or not temperature or not vibration:
        return None
    return [[co2.get("max"), co2.get("min"),
             co2.get("mean"), co2.get("variance")],
            [humidity.get("max"), humidity.get("min"),
             humidity.get("mean"), humidity.get("variance")],
            [temperature.get("max"), temperature.get("min"),
             temperature.get("mean"), temperature.get("variance")],
            [vibration.get("max"), vibration.get("min"),
             vibration.get("mean"), vibration.get("variance")]]


def array_to_json_factor(json_data: dict):
    return None
