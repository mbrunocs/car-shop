// template para criação dos testes de cobertura da camada de controller
import { Request, Response } from 'express';
import sinon, { SinonStub } from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import CarService from "../../../services/carServices";
import { mockNewCar, mockRespCar, mockUpdateCar, mockRespUpdatedCar } from '../../mocks/mock_car';

import { 
  deleteCar,
  getCar,
  registerCar,
  showCars,
  updateCar } from '../../../controllers/carsCtrl';
const { expect } = chai;


describe('Test Control Layer', () => {
  const cars = new CarModel();
  const carServices = new CarService(cars);
  const req = {} as Request;
  const res = {} as Response;
  
  // before(async () => {
  //   sinon
  //     .stub(carServices, 'create')
  //     .resolves(mockRespCar);
  //   sinon
  //     .stub(carServices, 'delete')
  //     .resolves(undefined);
  //   sinon
  //     .stub(carServices, 'read')
  //     .resolves([mockRespCar]);
  //   sinon
  //     .stub(carServices, 'readOne')
  //     .resolves(mockRespCar);
  //   sinon
  //     .stub(carServices, 'update')
  //     .resolves(mockUpdateCar);

    // res.status = sinon.stub().returns(res);
    // res.json = sinon.stub().returns(res);
    // res.end = sinon.stub().returns(res);
  // });

  // after(()=>{
  //   (carServices.create as sinon.SinonStub).restore();
  // })

  describe.only('Test carControl.Create', () => {
    before(()=>{
      sinon
      .stub(carServices, 'create')
      .resolves(mockRespCar);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    })
    after(()=>{
      (carServices.create as SinonStub).restore();
    })

    it('When Success', async () => {
      req.body = mockNewCar;
      await registerCar(req, res); // está aguardando o banco e crash por timeout
      console.log(res);
      
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    });
    it('When Feilure', async () => {});
  });
  describe('Test carControl.Delete', async () => {
    it('When Success', async () => {
      req.params.id = mockRespCar._id;
      await deleteCar(req, res); // está aguardando o banco e crash por timeout
      
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
  describe('Test carControl.ReadAll', async () => {
    it('When Success', async () => {
      await showCars(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });
  });
  describe('Test carControl.ReadOne', async () => {
    it('When Success', async () => {
      req.params.id = mockRespCar._id;
      await getCar(req, res); // está aguardando o banco e crash por timeout
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });
  });
  describe('Test carControl.Update', async () => {
    it('When Success', async () => {
      req.body = mockUpdateCar;
      req.params.id = mockRespUpdatedCar._id;
      await updateCar(req, res); // está aguardando o banco e crash por timeout
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });
  });

});