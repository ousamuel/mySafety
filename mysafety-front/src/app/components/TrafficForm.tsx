// "use client";
// import React, { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { MultiSelect } from "react-multi-select-component";
// import axios from "axios";
// import { time } from "console";
// type FormValues = {
//   example: string;
//   exampleRequired: string;
//   minLat: number;
//   maxLat: number;
//   minLong: number;
//   maxLong: number;
// };

// const getTrafficData = async (data: FormValues): Promise<void> => {
//   try {
//     let domain = `https://api.tomtom.com/traffic/services/5/incidentDetails?`;
//     let area = `bbox=${`-74.2591,40.4774,-73.7004,40.9176`}&`;
//     let fields = `fields=%7Bincidents%7Btype%2Cgeometry%7Btype%2Ccoordinates%7D%2Cproperties%7BiconCategory%7D%7D%7D&`;
//     let language = `language=en-US&`;
//     let categoryFilters =
//       "categoryFilter=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C14&";
//     let timeValidityFilter = "timeValidityFilter=present&";
//     let TOM_API_KEY = process.env.NEXT_PUBLIC_TOM_API_KEY;

//     const response = await axios.get(
//       domain +
//         area +
//         fields +
//         language +
//         categoryFilters +
//         timeValidityFilter +
//         TOM_API_KEY
//     );
//     const trafficData = response.data;
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching traffic data:", error);
//   }
// };

// const CategoryFilterSelect = [
//   { label: "Accident", value: "1" },
//   { label: "Dangerous Conditions", value: "3" },
//   { label: "Traffic Jam", value: "6" },
//   { label: "Road Closed", value: "8" },
//   { label: "RoadWorks", value: "9" },
//   { label: "Broken Down Vehicle", value: "14" },
// ];
// //   0: Unknown
// // 2: Fog
// // 4: Rain
// // 5: Ice
// // 10: Wind
// // 11: Flooding
// const TrafficForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>();
//   const onSubmit: SubmitHandler<FormValues> = async (data) => {
//     await getTrafficData(data);
//     console.log(data);
//   };
//   const [selected, setSelected] = useState([]);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("example")} placeholder="Example" />
//       <input
//         {...register("exampleRequired", { required: true })}
//         placeholder="Example Required"
//       />
//       {errors.exampleRequired && <span>This field is required</span>}
//       <input type="submit" />
//       <MultiSelect
//         options={CategoryFilterSelect}
//         value={selected}
//         onChange={setSelected}
//         labelledBy="Select"
//       />
//     </form>
//   );
// };

// export default TrafficForm;
