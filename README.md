# Algobench-20-21

This is my UG4 Honours Project at the University of Edinburgh. It's the sixth iteration of AlgoBench, a tool for learning about algorithms, and the second iteration of the online version. Continuation of work by Eziama Ubachukwu, Yufen Wang, Shalom Rachapudi David, Nevena Blagoeva and Yuecheng Hu.

## Setup

If you're using MacOS, you might be able to skip straight to step 5

1. Clear the backend/build directory
2. `$ cd backend/build`
3. `$ cmake ../source && make`
4. Move the created AlgoBench_Backend file to `online/src/main/resources`
5. Open `online/algorithms` in IntelliJ IDEA and build the project
6. Run AlgoBench.java with the path to the backend file as the sole argument
7. The application should now be accessible at localhost:8080; the old UI can be viewed at loaclhost:8080/old.html

