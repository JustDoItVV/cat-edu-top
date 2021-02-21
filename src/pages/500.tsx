import { HTag } from '../components';
import withLayout from '../layout/Layout';

export default withLayout(function error500(): JSX.Element {

  return (
    <>
      <HTag tag='h1'>500</HTag>
    </>
  );
});
