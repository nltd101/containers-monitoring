def dict_to_list_factor(dict_data: dict):
    co2: dict = dict_data.get("co2")
    humidity: dict = dict_data.get("humidity")
    temperature: dict = dict_data.get("temperature")
    vibration: dict = dict_data.get("vibration")
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


def list_to_dict_factor(list_data: list):
    co2 = {"max": list_data[0][0], "min": list_data[0][1], "mean": list_data[0][2], "variance": list_data[0][3]}
    humidity   = {"max": list_data[1][0], "min": list_data[1][1], "mean": list_data[1][2], "variance": list_data[1][3]}
    temperature = {"max": list_data[2][0], "min": list_data[2][1], "mean": list_data[2][2], "variance": list_data[2][3]}
    vibration = {"max": list_data[3][0], "min": list_data[3][1], "mean": list_data[3][2], "variance": list_data[3][3]}
    return {"co2": co2, "temperature": temperature, "humidity": humidity, "vibration": vibration}
