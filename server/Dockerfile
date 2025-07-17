FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

COPY . .

RUN ./gradlew build

# Copy the Gradle build files and application code to the container
COPY build/libs/server-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the application will run on
EXPOSE 9443

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]