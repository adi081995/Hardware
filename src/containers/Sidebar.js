import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StyleSheet, ScrollView, View, Linking} from 'react-native';
import {Header,ThemedView, Text, ListItem} from 'src/components';
import ItemCategoryMenu from './ItemCategoryMenu';

import {categorySelector} from 'src/modules/category/selectors';
import {wishListSelector,configsSelector, languageSelector} from 'src/modules/common/selectors';
import {padding, margin} from 'src/components/config/spacing';

import {homeTabs, mainStack} from 'src/config/navigator';
import {excludeCategory} from '../utils/category';
import {exclude_categories_sidebar} from '../config/category';

import HeaderMe from '../screens/profile/containers/HeaderMe';
import SettingMe from '../screens/profile/containers/SettingMe';
import InformationMe from '../screens/profile/containers/InformationMe';
import Container from 'src/containers/Container';
import SocialIcon from 'src/containers/SocialIcon';
import {TextHeader, CartIcon} from './containers/HeaderComponent';

import {authSelector} from 'src/modules/auth/selectors';
import {grey5} from '../src/components/config/colors';

class Sidebar extends React.Component {
  handlePage = (router, params = {}) => {
    const {navigation} = this.props;
    if (!navigation) {
      return null;
    }
    navigation.navigate(router, params);
  };

  render() {
    const {t, category, configs, language, navigation, auth: {isLogin},} = this.props;
    const dataHelpInfo = [
      {
        id: '1',
        name: t('common:text_home'),
        router: mainStack.home_tab,
        params: {
          screen: homeTabs.home_drawer,
        },
      },
      {
        id: '2',
        name: t('common:text_blogs'),
        router: mainStack.blogs,
      },
      // {
      //   id: '3',
      //   name: t('common:text_about'),
      //   router: mainStack.page,
      //   params: {
      //     id: configs.getIn(['about', language]),
      //     type: 'page',
      //   },
      // },
      {
        id: '4',
        name: t('profile:text_term'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['term', language]),
          type: 'page',
        },
      },
      {
        id: '5',
        name: t('common:text_privacy_full'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['policy', language]),
          type: 'page',
        },
      },
      {
        id: '6',
        name: 'common:text_contact',
        router: mainStack.contact,
      },
    ];

    const {data} = category;

    // Filter include category
    const _data = excludeCategory(data, exclude_categories_sidebar);

    return (
      <ThemedView isFullView>
        <ScrollView>
        <ScrollView>
        <Text h6 medium style={[styles.title, styles.titleHead]}>
            {/* {t('common:text_category')} */}
          </Text>
          <Container style={styles.viewContent}>
            <HeaderMe />
            <InformationMe isLogin={isLogin} clickPage={this.goPageOther} />
            <SettingMe
              isLogin={isLogin}
              clickPage={this.goPageOther}
              goPhone={this.handleLinkUrl}
              phonenumber={configs.get('phone')}
            />
            <Text h6 colorThird>
              {typeof configs.get('copyright') === 'string'
                ? configs.get('copyright')
                : configs.getIn(['copyright', language])}
            </Text>
          </Container>
        </ScrollView>
          {/* <Text h3 medium style={[styles.title, styles.titleHead]}>
            {t('common:text_category')}
          </Text>
          {_data.map(c => (
            <ItemCategoryMenu
              key={c.id}
              category={c}
              isOpen={
                navigation.state && navigation.state.isDrawerOpen
                  ? navigation.state.isDrawerOpen
                  : false
              }
              goProducts={this.handlePage}
            />
          ))}
          <Text h3 medium style={styles.title}>
            {t('common:text_help')}
          </Text>
          {dataHelpInfo.map(value => (
            <ListItem
              key={value.id}
              title={t(value.name)}
              titleProps={{
                medium: true,
              }}
              type="underline"
              small
              containerStyle={styles.item}
              onPress={() => this.handlePage(value.router, value.params)}
            />
          ))} */}
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop:  4,
    marginBottom: margin.small + 1,
    paddingHorizontal: padding.large,
  },
  titleHead: {
    paddingTop: getStatusBarHeight(),
  },
  item: {
    paddingHorizontal: padding.large,
  },
});

const mapStateToProps = state => ({
  auth: authSelector(state),
  category: categorySelector(state),
  configs: configsSelector(state),
  language: languageSelector(state),
});
export default connect(mapStateToProps)(withTranslation()(Sidebar));
