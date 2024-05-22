import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = GetUserInfoResponse;

export type FarmType = Farm;

export type sectionEstimationType = {
	id: string | number | undefined;
	section: {
		id: string | number | undefined;
		jahad_name: string | undefined;
		product: {
			id: string | number | undefined;
			name: string | undefined;
			fee: string | number | undefined;
		};
		max_capacity: number | undefined;
		min_capacity: number | undefined;
	};
	cultivation_area: string | number | undefined;
	production_estimation: string | number | undefined;
	unit_price: string | number | undefined;
	total_price: string | number | undefined;
};

export type UserFarmsType = {
	user: UserType;
	farms: Array<FarmType>;
	chosenFarm: FarmType | undefined;
	estimations: Array<sectionEstimationType> | undefined;
};

const initialState: UserFarmsType = {
	user: {
		id: 0,
		user: {
			first_name: "",
			last_name: "",
			full_name: "",
			phone_number: "",
			avatar: ""
		},
		is_legal: false,
		natural_data: {
			id: 0,
			national_id: "",
			father_name: ""
		},
    legal_data: undefined
	},
	farms: [
		{
			status: -1,
			address: {
				id: "",
				province: "",
				city: "",
				location: "",
				latlng: ""
			},
			id: "",
			jahad_name: "",
			sections: [
				{
					id: "",
					jahad_name: "",
					product: {
						id: "",
						name: "",
						fee: 0
					},
					max_capacity: 0,
					min_capacity: 0,
          value: 0,
				}
			],
			has_contradiction: true,
			cultivation_type: {
				code: 0,
				name: ""
			},
			product: {
				id: "",
				name: "",
				fee: 0
			},
			year: 0
		}
	],
	chosenFarm: undefined,
	estimations: undefined
};

const userFarmsSlice = createSlice({
	name: "userfarms",
	initialState,
	reducers: {
		setUser (state: typeof initialState, action: PayloadAction<UserType>) {
			state.user = { ...state.user, ...action.payload };
		},
		setFarms (state: typeof initialState, action: PayloadAction<Array<FarmType>>) {
			state.farms = { ...state.farms, ...action.payload };
		},
		setChosenFarm (state: typeof initialState, action: PayloadAction<FarmType>) {
			state.chosenFarm = action.payload;
		},
		setEstimations (state: typeof initialState, action: PayloadAction<Array<sectionEstimationType>>) {
			state.estimations = action.payload;
		}
	}
});

export const { setUser, setFarms, setChosenFarm, setEstimations } = userFarmsSlice.actions;

export const { reducer: userFarmsReducer } = userFarmsSlice;
