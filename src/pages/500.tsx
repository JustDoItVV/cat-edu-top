import { HTag } from '../components';
import withLayout from '../layout/Layout';

export default withLayout(function error500(): React.JSX.Element {

  return (
    <>
      <HTag tag='h1'>500</HTag>
    </>
  );
});
