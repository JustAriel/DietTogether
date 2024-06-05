import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image } from 'react-native';

const Home = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [progress, setProgress] = useState(0);
  const heightAnimation = useRef(new Animated.Value(0)).current;

  const changeDate = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + increment);
    setCurrentDate(newDate);
  };

  const handleGoalCompleted = () => {
    if (progress < 100) {
      Animated.timing(heightAnimation, {
        toValue: (progress + 20) / 100,
        duration: 800,
        useNativeDriver: false,
      }).start();
      setProgress(prevProgress => prevProgress + 20);
    }
  };

  const generateRandomQuests = () => {
    const quests = [];
    for (let i = 1; i <= 3; i++) {
      const randomQuest = `${getRandomTask()}`;
      quests.push(randomQuest);
    }
    return quests;
  };

  const getRandomTask = () => {
    const tasks = ['Eat no more than 3 meals', 'Eat healthy this morning', 'Drink enough water'];
    return tasks[Math.floor(Math.random() * tasks.length)];
  };

  const formatDate = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    if (day < 10) return `${month}, ${dayOfWeek} 0${day}`;
    return `${month}, ${dayOfWeek} ${day}`;
  };

  const FoodView = ({ title, foods }) => {
    return (
      <View style={styles.foodContainer}>
        <View style={styles.rowAdd}>
          <Text style={styles.foodTitle}>{title}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Config')}>
            <Text style={styles.add}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.foodList}>
          {foods.map((food, index) => (
            <View key={index} style={styles.foodItem}>
              <Image source={{ uri: food.image }} style={styles.foodImage} />
              <Text>{food.name}</Text>
              <Text>{food.time}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.dayContainer}>
        <TouchableOpacity onPress={() => changeDate(-1)} style={styles.button}>
          <Text style={styles.buttonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={[styles.text, styles.dateText]}>{formatDate(currentDate)}</Text>
        <TouchableOpacity onPress={() => changeDate(1)} style={styles.button}>
          <Text style={styles.buttonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scaleMain}>
        <View style={styles.scaleContainer}>
          <Animated.View style={[styles.scale, { height: `${progress}%` }]} />
        </View>
        <View style={styles.goalsContainer}>
          {generateRandomQuests().map((quest, index) => (
            <Text key={index} style={styles.questText}>○ {quest}</Text>
          ))}
        </View>
      </View>
      <FoodView title="Breakfast" foods={[{ name: "Omelette", time: "8:00 AM", image: "https://via.placeholder.com/150" }, { name: "Toast", time: "8:30 AM", image: "https://via.placeholder.com/150" }]} />
      <FoodView title="Second Meal" foods={[{ name: "Cookies", time: "14:53", image: "https://via.placeholder.com/150" }, { name: "Cake", time: "17:23", image: "https://via.placeholder.com/150" }]} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 70,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#000",
  },
  dateText: {
    minWidth: 210,
    maxWidth: 210,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
  },
  dayContainer: {
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 330,
    height: 50,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
  },
  scaleContainer: {
    marginTop: 20,
    width: 27,
    height: 120,
    backgroundColor: '#ccc',
    marginBottom: 20,
    borderRadius: 20,
  },
  scale: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'orange',
    borderRadius: 20,
  },
  goalButton: {
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
  },
  scaleMain: {
    width: 330,
    borderRadius: 20,
    marginTop: 8,
    paddingHorizontal: 15,
    height: 140,
    justifyContent:"center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
  },
  goalsContainer: {
    marginTop: 0,
    flex: 1,
    marginLeft: 20,
    width: 250,
    height: 120,
    borderRadius: 12,
    justifyContent: "center",
    paddingLeft: 20,
  },
  questText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  foodContainer: {
    marginTop: 20,
  },
  foodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    marginLeft: 20,
    marginTop: 5,
  },
  foodList: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    justifyContent: "space-between",
    width: 320,
    height: 80,
    backgroundColor: "#f9f9f9",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 12,
  },
  foodImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  foodName: {
    marginTop: 5,
    fontWeight: "bold",
  },
  foodTime: {
    color: "#666",
  },
  add: {
    fontSize: 30,
    fontWeight:"bold",
  },
  rowAdd: { 
    flexDirection: "row",
    justifyContent: "space-between", 
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    paddingRight: 10,
  }
})

export default Home;
