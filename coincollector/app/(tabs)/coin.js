import { ScrollView, Text, View } from "react-native";
import AddCoinForm from '../../components/coins/AddCoinForm';

export default function Coin() {
  return (
    <ScrollView style={{ marginTop: 30 }}>
     <AddCoinForm />
    </ScrollView>
  );
}
