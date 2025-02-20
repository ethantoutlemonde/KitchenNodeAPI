import { Request, Response } from "express";
import * as RestaurantService from "../services/restaurant.service";

export const createRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await RestaurantService.createRestaurant(req.body);
        res.status(201).send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await RestaurantService.getRestaurants();
        res.status(200).send(restaurants);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getRestaurantById = async (req: Request, res: Response) => {
    try {
        const restaurant = await RestaurantService.getRestaurantById(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await RestaurantService.updateRestaurant(req.params.id, req.body);
        if (!restaurant) {
            return res.status(404).send();
        }
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await RestaurantService.deleteRestaurant(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(500).send(error);
    }
};