// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;

import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const DashIcon = () => {
  <svg width="17" height="17" Box="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.9998 1.0625V8.8629C16.9926 8.87114 16.9866 8.88045 16.9822 8.8905C16.777 9.6037 16.3611 9.91658 15.6156 9.91658C13.9345 9.91658 12.2533 9.91658 10.572 9.91658C10.4285 9.91904 10.2852 9.90397 10.1454 9.87169C9.56017 9.72306 9.21005 9.23796 9.20972 8.58693C9.20972 6.17078 9.20972 3.75352 9.20972 1.33515C9.20972 1.28528 9.20972 1.2354 9.21371 1.18585C9.26391 0.51853 9.77097 0.00814619 10.4187 0.00548621C12.2106 -0.00182874 14.0024 -0.00182874 15.7942 0.00548621C16.3192 0.0071487 16.7754 0.360261 16.938 0.861668C16.9596 0.926837 16.9792 0.994668 16.9998 1.0625Z"
      fill="white"
    />
    <path
      d="M6.74517 16.9951H1.07044C0.309349 16.8205 -0.0071912 16.2516 0.000123744 15.5045C0.0230661 13.1438 0.00843651 10.781 0.00876901 8.41896C0.00876901 7.60002 0.525803 7.07967 1.34308 7.079C3.0519 7.07767 4.76061 7.07767 6.4692 7.079C7.27451 7.079 7.79653 7.60302 7.79919 8.40899C7.79919 9.10025 7.79919 9.79151 7.79919 10.4831C7.79919 12.2141 7.79919 13.9453 7.79919 15.6767C7.79919 16.217 7.57442 16.6257 7.08598 16.8737C6.97892 16.9259 6.85922 16.9552 6.74517 16.9951Z"
      fill="white"
    />
    <path
      d="M10.263 16.9952C10.1443 16.9519 10.0199 16.9207 9.90855 16.8638C9.45835 16.6361 9.21895 16.26 9.21363 15.7603C9.20266 14.6929 9.199 13.6253 9.21363 12.558C9.22394 11.8421 9.76358 11.3324 10.4894 11.3277C11.7612 11.3221 13.033 11.3261 14.3048 11.3261C14.7584 11.3261 15.2116 11.3261 15.6651 11.3261C16.356 11.3261 16.7979 11.6692 16.9755 12.3365C16.9816 12.3518 16.9895 12.3663 16.9991 12.3798V15.9312C16.9123 16.1244 16.8478 16.3318 16.7331 16.5074C16.5499 16.7887 16.2529 16.9147 15.9351 16.9935L10.263 16.9952Z"
      fill="white"
    />
    <path
      d="M3.91324 0.00183109C4.76998 0.00183109 5.62682 0.00183109 6.48378 0.00183109C7.26881 0.00183109 7.79581 0.524854 7.79814 1.31088C7.80102 2.3281 7.80102 3.34543 7.79814 4.36288C7.79548 5.13726 7.2688 5.66692 6.49542 5.66825C4.7651 5.67158 3.03489 5.67158 1.3048 5.66825C0.532405 5.66659 0.0100516 5.13294 0.00805664 4.35755C0.00805664 3.34011 0.00805664 2.32277 0.00805664 1.30555C0.00805664 0.530834 0.535398 0.00348578 1.30879 0.00215579C2.17727 -0.000282525 3.04542 -0.000385565 3.91324 0.00183109Z"
      fill="white"
    />
  </svg>;
};

const DashboardIcon = () => <Icon component={DashIcon} />;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing

  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },

        {
          name: 'signup',
          path: '/user/signup',
          component: './user/signup',
        },
        {
          name: 'inviteUser',
          path: '/user/invitation',
          component: './user/acceptInvitation',
        },
        {
          path: '/user/user-confirmation',
          name: 'user-confirmation',
          component: './user/UserConfirmation',
          // hideInMenu: true,
        },
        {
          path: '/user/user-signature',
          name: 'user-signature',
          component: './user/UserSignature',
          // hideInMenu: true,
        },
        {
          path: '/user/message',
          name: 'user-message',
          component: './user/UserMessage',
          // hideInMenu: true,
        },

        // {
        //   name: 'forgotpassword',
        //   path: '/user/forgotpassword',
        //   component: './user/ForgotPassword',
        // },
      ],
    },

    {
      path: '/',

      // component: '../layouts/UserLayout',
      component: '../layouts/SecurityLayout',
      // component: '../layouts/BasicLayout',

      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },
            {
              path: '/user-profile',
              name: 'user-profile',
              component: './UserProfile',
              hideInMenu: true,
            },
            {
              path: '/quickBooksTest',
              name: 'quickBooksTest',
              component: './QuickBooksForm',
              hideInMenu: true,
            },
            // {
            //   path: '/user-confirmation',
            //   name: 'user-confirmation',
            //   component: './UserConfirmation',
            //   hideInMenu: true,
            // },

            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'AppstoreAddOutlined',
              component: './Dashboard',
            },
            {
              name: 'Driver',
              icon: 'UserOutlined',
              path: '/driver',
              routes: [
                {
                  name: 'Driver',
                  path: '/driver',
                  component: './Driver',
                  hideInMenu: true,
                },
                {
                  name: 'Driver Profile',
                  path: '/driver/profile/:id',
                  component: './Driver/DriverProfile',
                  hideInMenu: true,
                },
              ],
            },
            {
              path: '/addUser',
              name: 'Add User to Portal',
              component: './AddUser',
              icon: 'UserAddOutlined',
            },
            {
              path: '/clearingHouse',
              name: 'Clearing House',
              component: './ClearingHouse',
              icon: 'BankOutlined',
            },
            {
              path: '/clientDetails/:id',
              name: 'Client Details',
              component: './ProfileDetails',
              hideInMenu: true,
            },
            {
              path: '/clients',
              name: 'Clients',
              component: './Clients',
              icon: 'UsergroupAddOutlined',
            },
            {
              name: 'Settings',
              icon: 'SettingOutlined',
              routes: [
                {
                  path: '/settings/services',
                  name: 'Services',
                  component: './Settings/Services',
                },
              ],
            },

            {
              component: './404',
            },
          ],
        },
      ],
    },
    {
      component: './404',
    },

    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
