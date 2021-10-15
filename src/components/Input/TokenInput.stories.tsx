import { StorybookWrapper } from '../../shared/StorybookWrapper';
import { TokenInput } from './TokenInput';
import ETHIcon from './../../icons/assets/ETH.svg';

console.log('icon', ETHIcon);

export default {
    title: 'components/Input/TokenInput',
    component: TokenInput,
    args: {
        asset: {
            symbol: 'BSXFF',
            fullName: 'Basilisk',
            icon: ETHIcon,
        }
    }
}

const Template = (args: any) => {
    return <StorybookWrapper >
        <div style={{
            width: '400px'
        }}
        >
            <TokenInput {...args} />
        </div>
    </StorybookWrapper>
}

export const Default = Template.bind({});