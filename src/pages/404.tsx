import { HTag } from '../components';
import withLayout from '../layout/Layout';

export default withLayout(function error404(): JSX.Element {

  return (
    <>
      <HTag tag='h1'>404</HTag>
    </>
  );
});
