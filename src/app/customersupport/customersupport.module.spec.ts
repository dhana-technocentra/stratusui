import { CustomersupportModule } from './customersupport.module';

describe('CustomersupportModule', () => {
  let customersupportModule: CustomersupportModule;

  beforeEach(() => {
    customersupportModule = new CustomersupportModule();
  });

  it('should create an instance', () => {
    expect(customersupportModule).toBeTruthy();
  });
});
