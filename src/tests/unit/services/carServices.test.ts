import * as sinon from 'sinon';
import { ZodError } from 'zod';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import CarService from "../../../services/carServices";
import { mockNewCar, mockRespCar, mockUpdateCar, mockRespUpdatedCar } from '../../mocks/mock_car';

const { expect } = chai;

describe('Test CarServices', () => {
  const car = new CarModel();
  const carService = new CarService(car);

  before(() => {
    sinon.stub(car, 'create').resolves(mockRespCar);

    sinon.stub(car, 'delete')
      .onCall(0).resolves(mockRespCar)
      .onCall(1).resolves(null);

    sinon.stub(car, 'read').resolves([mockRespCar]);

    sinon.stub(car, 'readOne')
      .onCall(0).resolves(mockRespCar) // delete testOk
      .onCall(1).resolves(null)
      .onCall(2).resolves(mockRespCar) // readOne test
      .onCall(3).resolves(null)
      .onCall(4).resolves(mockRespCar) // update test
      .onCall(5).resolves(null);

    sinon.stub(car, 'update')
      .onCall(0).resolves(mockRespUpdatedCar)
      .onCall(1).resolves(null);
  })

  after(()=>{
    sinon.restore();
  })

  describe('Test car.create', async () => {
    it('When Success', async () => {
      const carCreated = await carService.create(mockNewCar);

      expect(carCreated).to.be.deep.equal(mockRespCar);
    });

    it('When Failure', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  });
  describe('Test car.delete', async () => {
    it('Success', async () => {
      const carCreated = await carService.delete(mockRespCar._id);

      expect(carCreated).to.be.deep.equal(mockRespCar);
    });

    it('Failure', async () => {
      try {
        await carService.delete('invalid_id');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    })
  });
  describe('Test car.read', async () => {
    it('Success', async () => {
      const carList = await carService.read();
      
      expect(carList).to.be.deep.equal([mockRespCar]);
    });

    it('Failure', async () => {
      // try {
      //   await carService.read();
      // } catch (error: any) {
      //   expect(error.message).to.be.equal('not found');
      // }
    })
  });
  describe('Test car.readOne', async () => {
    it('Success', async () => {
      const returnedCar = await carService.readOne(mockRespCar._id);

      expect(returnedCar).to.be.deep.equal(mockRespCar);
    });

    it('Failure', async () => {
      try {
        await carService.readOne('invalid_id');
      } catch (error: any) {
        expect(error.message).to.be.equal('Object not found');
      }
    })
  });
  describe('Test car.update', async () => {
    it('Success', async () => {
      const changedCar = await carService.update(mockRespCar._id, mockUpdateCar);

      expect(changedCar).to.be.deep.equal(mockRespUpdatedCar);
    });

    it('Failure', async () => {
      try {
        await carService.update(mockRespCar._id, mockUpdateCar);
      } catch (error: any) {
        expect(error.message).to.be.equal('Object not found');
      }
    })
  });

});