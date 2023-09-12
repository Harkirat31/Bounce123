"""Capacited Vehicles Routing Problem (CVRP)."""

from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
from .distance_calculator import getDistanceMatrix


def create_data_model(locationsList, driverSize, vehiclesCapacity):
    """Stores the data for the problem."""
    data = {}
    data['distance_matrix'] = [[0, 24554, 26469, 14890, 12889, 20037, 20823, 13985, 15010, 30308, 23337, 8569, 20031, 6515, 14407, 31153, 21534, 18953], [24769, 0, 9797, 35082, 34234, 41382, 42168, 35330, 35933, 32098, 31085, 33021, 9263, 30728, 35753, 3821, 18980, 40298], [29343, 9817, 0, 39656, 36665, 43813, 44599, 37761, 40197, 21397, 26771, 35451, 13412, 33159, 38184, 8839, 38868, 42729], [14297, 33714, 35629, 0, 20716, 27863, 28649, 21812, 22837, 28483, 23171, 9606, 29191, 8266, 11921, 40313, 31566, 26780], [13141, 34544, 36457, 22763, 0, 13217, 14003, 2705, 4192, 39827, 33204, 5703, 30562, 9353, 5878, 41144, 29274, 12133], [20765, 42169, 44081, 30387, 11341, 0, 10068, 8943, 16271, 47452, 40828, 7424, 38429, 16978, 3444, 48768, 36110, 1868], [20532, 41935, 43847, 30154, 11107, 10245, 0, 8709, 16038, 47218, 40595, 16238, 38195, 16744, 11931, 48535, 35876, 9162], [13698, 35101, 37014, 23320, 2705, 8803, 9589, 0, 9204, 40384, 33761, 9404, 31362, 9911, 4963, 41701, 29042, 7719], [16079, 35683, 40495, 25701, 4195, 17190, 17976, 6173, 0, 45607, 36142, 11785, 24778, 12292, 11696, 42282,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    23491, 16106], [29918, 32200, 21444, 30286, 39357, 46504, 47290, 40453, 44325, 0, 4602, 38143, 27678, 35850, 40875, 38800, 42996, 45421], [22977, 31086, 26940, 25132, 32430, 39578, 40364, 33526, 34552, 5146, 0, 31216, 26563, 28924, 33948, 37685, 41710, 38494], [8590, 30434, 32346, 9598, 5696, 7455, 16194, 9356, 10382, 35717, 29093, 0, 25911, 3280, 4282, 37033, 27546, 8255], [21207, 9260, 14502, 31520, 31092, 38106, 38892, 32054, 24519, 28536, 27524, 28249, 0, 27167, 32611, 15859, 23190, 37022], [6556, 28589, 30502, 8290, 8407, 15555, 16341, 9503, 10529, 33872, 27249, 3282, 24067, 0, 6477, 35189, 24786, 14471], [15162, 36565, 38478, 11386, 6055, 3444, 11919, 4962, 10426, 41848, 35225, 4251, 32583, 6473, 0, 43165, 31295, 4108], [30075, 3997, 8821, 40388, 39541, 46689, 47475, 40637, 41240, 37404, 36392, 38327, 14570, 36035, 41059, 0, 21185, 45605], [22725, 18939, 38380, 33782, 30740, 36097, 36883, 30045, 24167, 43492, 42405, 27735, 22664, 24514, 32259, 21206, 0, 35013], [20569, 41972, 43884, 30190, 11144, 1876, 9871, 8746, 16075, 47255, 40631, 8275, 38232, 16781, 4113, 48572, 35913, 0]]
    # data["distance_matrix"] = getDistanceMatrix(locationsList)
    print(data["distance_matrix"])
    data["demands"] = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    data["vehicle_capacities"] = vehiclesCapacity
    data["num_vehicles"] = driverSize
    data["depot"] = 0
    return data


def print_solution(data, manager, routing, solution):
    """Prints solution on console."""
    routes = {}
    print(f"Objective: {solution.ObjectiveValue()}")
    total_distance = 0
    total_load = 0
    for vehicle_id in range(data["num_vehicles"]):
        routes[vehicle_id] = {}
        routes[vehicle_id]['path'] = []
        index = routing.Start(vehicle_id)
        plan_output = f"Route for vehicle {vehicle_id}:\n"
        route_distance = 0
        route_load = 0
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            route_load += data["demands"][node_index]
            plan_output += f" {node_index} Load({route_load}) -> "
            # adding to the array of locations
            routes[vehicle_id]['path'].append(node_index)
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id
            )
        plan_output += f" {manager.IndexToNode(index)} Load({route_load})\n"
        routes[vehicle_id]['path'].append(manager.IndexToNode(index))
        plan_output += f"Distance of the route: {route_distance}m\n"
        plan_output += f"Load of the route: {route_load}\n"
        print(plan_output)
        total_distance += route_distance
        total_load += route_load
        routes[vehicle_id]['Total Distance in meters'] = route_distance
    print(f"Total distance of all routes: {total_distance}m")
    print(f"Total load of all routes: {total_load}")
    print('\n')
    print(routes)
    return routes


def main(locationsList, driverSize, vehiclesCapacity):
    """Solve the CVRP problem."""
    # Instantiate the data problem.
    data = create_data_model(locationsList, driverSize, vehiclesCapacity)

    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(
        len(data["distance_matrix"]), data["num_vehicles"], data["depot"]
    )

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)

    # Create and register a transit callback.
    def distance_callback(from_index, to_index):
        """Returns the distance between the two nodes."""
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data["distance_matrix"][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Add Capacity constraint.
    def demand_callback(from_index):
        """Returns the demand of the node."""
        # Convert from routing variable Index to demands NodeIndex.
        from_node = manager.IndexToNode(from_index)
        return data["demands"][from_node]

    demand_callback_index = routing.RegisterUnaryTransitCallback(
        demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,  # null capacity slack
        data["vehicle_capacities"],  # vehicle maximum capacities
        True,  # start cumul to zero
        "Capacity",
    )

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
    )
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH
    )
    search_parameters.time_limit.FromSeconds(1)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)
    print(solution)

    # Print solution on console.
    if solution:
        return print_solution(data, manager, routing, solution)


if __name__ == "__main__":
    main()
