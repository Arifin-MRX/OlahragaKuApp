import React from 'react';
import {View, } from 'react-native';
import {Latihan} from '../screens';
import {
  Burpee_and_Jump_Exercise,
  Jumping_Jack_Excercise,
  Cobras_exercises,
  Frog_press_excercise,
  Reverse_Crunches_Excercise,
  Seated_abs_circles,
  single_leg_hip_rotation_exercise,
} from '../theme/latihan';


const ItemOtotPerut = () => {
  return (
    <View>
        <Latihan
          image={Cobras_exercises}
          title="Cobras exercises"
          description="00:30"
        />
        <Latihan
          image={Jumping_Jack_Excercise}
          title="Jumping Jack Excercise"
          description="00:30"
        />
        <Latihan
          image={Reverse_Crunches_Excercise}
          title="Reverse Crunches Excercise"
          description="00:30"
        />
        <Latihan
          image={Seated_abs_circles}
          title="Seated Abs Circles"
          description="00:30"
        />
        <Latihan
          image={single_leg_hip_rotation_exercise}
          title="Single Leg Hip Rotation Exercise"
          description="00:30"
        />
        <Latihan
          image={Burpee_and_Jump_Exercise}
          title="Burpee and Jump Exercise"
          description="00:30"
        />
        <Latihan
          image={Frog_press_excercise}
          title="Frog press excercise"
          description="00:30"
        />
     </View>
  );
};
export default ItemOtotPerut;

