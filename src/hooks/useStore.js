import create from 'zustand';
import firestore from '@react-native-firebase/firestore';
const logRef = firestore().collection('logs');

export const useStore = create(set => ({
  chartData: [],
  chartLabels: [],
  refreshData: async () => {
    try {
      const snapshots = await logRef.orderBy('date', 'desc').limit(5).get();

      const data = [];
      snapshots.forEach(snapshot => {
        data.push(snapshot.data());
      });
      data.sort(
        (a, b) =>
          new firestore.Timestamp(a.date['_seconds'], a.date['_nanoseconds'])
            .toDate()
            .getTime() -
          new firestore.Timestamp(b.date['_seconds'], b.date['_nanoseconds'])
            .toDate()
            .getTime(),
      );
      const chartLabels = data.map(data => {
        const date = new firestore.Timestamp(
          data.date['_seconds'],
          data.date['_nanoseconds'],
        ).toDate();
        return date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();
      });
      console.log(chartLabels);
      set({chartLabels: chartLabels, chartData: data});
    } catch (err) {
      console.log(err.message);
    }
  },
}));
