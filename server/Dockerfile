# Stage 1: build JAR
FROM openjdk:17-jdk-alpine as builder

# Set the working directory inside the container
WORKDIR /app

COPY . .

RUN ./gradlew build

# Stage 2: runtime image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle build files and application code to the container
COPY --from=builder /app/build/libs/server-0.0.9.jar ./app.jar

# Expose the port the application will run on
EXPOSE 9443

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]