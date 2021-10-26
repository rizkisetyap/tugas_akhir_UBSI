import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";

function TambahAnakForm() {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nama_anak: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      berat_lahir: "",
      panjang_badan: "",
      lingkar_kepala: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.Text,
    };
  };

  console.log(errors ? true : false);

  return (
    <View>
      <Controller
        control={control}
        name="nama_anak"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
      />
      <Button title="submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export default TambahAnakForm;
