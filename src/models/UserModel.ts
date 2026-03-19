import { AppDataSource }
    from '../dataSource.js';
import { User }
    from '../entities/User.js';

const userRepository =
    AppDataSource.getRepository(User);

async function getAllUsers():
    Promise<User[]> {
        return userRepository.find();
}
async function getUserById(
    userId: string
): Promise<User | null> {
    return userRepository.findOne(
        { where: { userId } }
    );
}
export { getAllUsers, getUserById };

// data layer 2 Adding Data & Handling Errors
async function addUser(email: string, passwordHash: string): Promise<User> {
  const newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  // userId is generated automatically by @BeforeInsert

  return userRepository.save(newUser);
} 

export { addUser }; 
