// template para criação dos testes de cobertura da camada de controller
import { Request, Response } from 'express';
import sinon, { SinonStub } from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import CarService from "../../../services/carServices";
import { mockNewCar, mockRespCar, mockUpdateCar, mockRespUpdatedCar } from '../../mocks/mock_car';
import CarController from '../../../controllers/carsCtrl';

// import carController from '../../../controllers/carsCtrl';
const { expect } = chai;

describe('Test Control Layer', () => {
  const cars = new CarModel();
  const carServices = new CarService(cars);
  const carController = new CarController(carServices);
  let req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(carServices, 'create')
      .resolves(mockRespCar);
    sinon
      .stub(carServices, 'delete')
      .resolves(undefined);
    sinon
      .stub(carServices, 'read')
      .resolves([mockRespCar]);
    sinon
      .stub(carServices, 'readOne')
      .resolves(mockRespCar);
    sinon
      .stub(carServices, 'update')
      .resolves(mockUpdateCar);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);

    // req = { params: { id: mockRespCar._id }} as Request<{ id: string }>;
  });

  after(()=>{
    // (carServices.create as SinonStub).restore();
    sinon.restore();
  })

  describe('Test carControl.Create', () => {
    // before(()=>{
    //   sinon
    //   .stub(carServices, 'create')
    //   .resolves(mockRespCar);

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns(res);
    // })
    // after(()=>{
    //   (carServices.create as SinonStub).restore();
    // })

    it('When Success', async () => {
      req.body = mockNewCar;
      await carController.registerCar(req, res); // está aguardando o banco e crash por timeout
      
      expect((res.status as SinonStub).calledWith(201)).to.be.true;
    });
    it('When Feilure', async () => {});
  });
  describe('Test carControl.Delete', async () => {
    it('When Success', async () => {
      req = { params: { id: mockRespCar._id }} as Request<{ id: string }>;
      console.log('teste params' + req.params.id);
      
      await carController.deleteCar(req, res); // está aguardando o banco e crash por timeout
      
      expect((res.status as SinonStub).calledWith(204)).to.be.true;
    });
  });
  describe('Test carControl.ReadAll', async () => {
    it('When Success', async () => {
      await carController.showCars(req, res);

      expect((res.status as SinonStub).calledWith(200)).to.be.true;
    });
  });
  describe('Test carControl.ReadOne', async () => {
    it('When Success', async () => {
      req = { params: { id: mockRespCar._id }} as Request<{ id: string }>;
      await carController.getCar(req, res); // está aguardando o banco e crash por timeout
      
      expect((res.status as SinonStub).calledWith(200)).to.be.true;
    });
  });
  describe('Test carControl.Update', async () => {
    it('When Success', async () => {
      req.body = mockUpdateCar;
      req = { params: { id: mockRespUpdatedCar._id }} as Request<{ id: string }>;
      await carController.updateCar(req, res); // está aguardando o banco e crash por timeout
      
      expect((res.status as SinonStub).calledWith(200)).to.be.true;
    });
  });

});