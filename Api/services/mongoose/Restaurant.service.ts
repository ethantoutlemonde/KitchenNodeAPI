import { Request, Response } from "express";
import { Restaurant } from "../models/restaurantModel";

export const createRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await Restaurant.find().populate('Adresse');
        res.status(200).send(restaurants);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getRestaurantById = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate('Adresse');
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
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            return res.status(404).send();
        }
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(500).send(error);
    }
};