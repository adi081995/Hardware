import React from 'react';
import {Dimensions,SafeAreaView,ScrollView,Text,StyleSheet} from 'react-native';
import SlideshowBasic from './Basic';
import SlideshowCreative from './Creative';
import MyDialog1  from '../Banners/MyDialog1';
import MyDialog2  from '../Banners/MyDialog2';
import MyDialog3  from '../Banners/MyDialog3';
import MyDialog4  from '../Banners/MyDialog4';
import action from 'src/utils/action';
import {Row,Col} from 'src/containers/Gird';


const {width} = Dimensions.get('window');

class Slideshow extends React.Component {
  render() {
    const {layout, fields, widthComponent} = this.props;

    if (
      !fields ||
      typeof fields !== 'object' ||
      Object.keys(fields).length < 1
    ) {
      return null;
    }
    if (layout === 'creative') {
      return (
        <SlideshowCreative
          fields={fields}
          widthComponent={widthComponent}
          clickGoPage={data => action(data)}
        />
      );
    }

    return (
      <Col>
    <SlideshowBasic
      fields={fields}
      widthComponent={widthComponent}
      clickGoPage={data => action(data)}
    />
     <SafeAreaView>
      <ScrollView  style={styles.text}>
      </ScrollView>
    </SafeAreaView>
    <ScrollView
  horizontal={true}
  >
    <Row style={[styles.dialogMain]}>
      <MyDialog1 />
      <MyDialog2 />
      <MyDialog3 />
      <MyDialog4 />
</Row>
  </ScrollView>
   
    
      </Col>
    );
  }
}
const styles = StyleSheet.create({
  dialogMain:{
    marginTop:20,
    marginBottom:-30,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    vertical:true,
  },
  text: {
    fontSize: 42,
  },
});

Slideshow.defaultProps = {
  widthComponent: width,
};
export default Slideshow;
