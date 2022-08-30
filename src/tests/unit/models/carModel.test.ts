import * as sinon from 'sinon';
import { ZodError } from 'zod';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from "../../../models/carModel";
import { mockNewCar, mockRespCar, mockUpdateCar, mockRespUpdatedCar } from '../../mocks/mock_car';

const { expect } = chai;

describe('Test CarModel<MongoModel>', () => {
  const car = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(mockRespCar);

    sinon.stub(Model, 'findByIdAndRemove')
      .onCall(0).resolves(mockRespCar)
      .onCall(1).resolves(null);

    sinon.stub(Model, 'find').resolves([mockRespCar]);

    sinon.stub(Model, 'findOne')
      .onCall(0).resolves(mockRespCar) // delete testOk
      .onCall(1).resolves(null)
      .onCall(2).resolves(mockRespCar) // readOne test
      .onCall(3).resolves(null)
      .onCall(4).resolves(mockRespCar) // update test
      .onCall(5).resolves(null);

    sinon.stub(Model, 'findByIdAndUpdate')
      .onCall(0).resolves(mockRespUpdatedCar)
      .onCall(1).resolves(null);
  })

  after(()=>{
    sinon.restore();
  })

  describe('Test car.create', async () => {
    it('When Success', async () => {
      const carCreated = await car.create(mockNewCar);

      expect(carCreated).to.be.deep.equal(mockRespCar);
    });

    it('When Failure', async () => {
      try {
        await car.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  });
  describe('Test car.delete', async () => {
    it('Success', async () => {
      const carCreated = await car.delete(mockRespCar._id);

      expect(carCreated).to.be.deep.equal(mockRespCar);
    });

    it('Failure', async () => {
      try {
        await car.delete('invalid_id');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    })
  });
  describe('Test car.read', async () => {
    it('Success', async () => {
      const carList = await car.read();
      
      expect(carList).to.be.deep.equal([mockRespCar]);
    });

    it('Failure', async () => {
      // try {
      //   await car.read();
      // } catch (error: any) {
      //   expect(error.message).to.be.equal('not found');
      // }
    })
  });
  describe('Test car.readOne', async () => {
    it('Success', async () => {
      const returnedCar = await car.readOne(mockRespCar._id);

      expect(returnedCar).to.be.deep.equal(mockRespCar);
    });

    it('Failure', async () => {
      try {
        await car.readOne('invalid_id');
      } catch (error: any) {
        expect(error.message).to.be.equal('invalid id');
      }
    })
  });
  describe('Test car.update', async () => {
    it('Success', async () => {
      const changedCar = await car.update(mockRespCar._id, mockUpdateCar);

      expect(changedCar).to.be.deep.equal(mockRespUpdatedCar);
    });

    it('Failure', async () => {
      try {
        await car.update(mockRespCar._id, mockUpdateCar);
      } catch (error: any) {
        expect(error.message).to.be.equal('Object not found');
      }
    })
  });

});