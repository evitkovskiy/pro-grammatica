export const PROFILE_FORM_CONTROLS = [
    {
        control: 'email',
        placeholder: 'Email',
        readonly: true,
        required: true
    },
    {
        control: 'firstName',
        placeholder: 'First name',
        readonly: false,
        required: true
    },
    {
        control: 'lastName',
        placeholder: 'Last name',
        readonly: false,
        required: true
    },
    {
        control: 'phoneNumber',
        placeholder: 'Phone number',
        readonly: false,
        required: true
    },
    {
        control: 'websiteUrl',
        placeholder: 'Website URL',
        readonly: false,
        required: false
    }
]

export const LOGIN_FORM_CONTROLS = [
    {
        control: 'login',
        placeholder: 'Login'
    },
    {
        control: 'password',
        placeholder: 'Password'
    }
]

export const MENU_ITEMS = [
    { label: 'Home', path: '/home' },
    { label: 'Inventory', path: '/inventory' },
    { label: 'Reports', path: '/reports' },
    { label: 'Billing', path: '/billing' },
    { label: 'Profile', path: '/profile' }
];
